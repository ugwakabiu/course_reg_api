import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateStudentDto,
  UpdateStudentDto,
} from './valdationSchemas/student.validationSchema';
import { Prisma } from '@prisma/client';
import { DepartmentService } from 'src/department/department.service';
import { UploadedFile } from 'express-fileupload';
import validateImageUtil from 'src/utils/validateImage.util';
import uploadImageUtil from 'src/utils/uploadImage.util';
import { join as pathJoin } from 'path';
import { constant } from 'src/constants/constant';
import { UserService } from 'src/user/user.service';
import { CreateCourseDto } from 'src/course/validationSchema/course.validationSchema';
import { getConfigUtil } from 'src/config/getConfig.util';

@Injectable()
export class StudentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly departmentService: DepartmentService,
    private readonly userService: UserService,
  ) {}

  async findAll() {
    return this.prismaService.student.findMany({
      include: {
        department: true,
        printedBy: {
          select: {
            username: true,
          },
        },
        registeredBy: {
          select: {
            username: true,
          },
        },
        PersonalInformation: true,
      },
      orderBy: [
        {
          department: {
            name: 'asc',
          },
        },
        {
          level: 'asc',
        },
      ],
    });
  }

  async find(params: {
    id: string;
    select?: Prisma.StudentFindUniqueArgs['select'];
    include?: Prisma.StudentFindUniqueArgs['include'];
  }) {
    const student = await this.prismaService.student.findFirst({
      where: { OR: [{ id: params.id }, { registrationNumber: params.id }] },
      include: {
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        PersonalInformation: true,
        registeredBy: { select: { username: true } },
        printedBy: { select: { username: true } },
        registeredCourses: {
          select: {
            course: {
              select: {
                id: true,
                title: true,
                code: true,
                category: true,
                level: true,
                semester: true,
                unit: true,
              },
            },
          },
        },
      },
    });

    const transformed = {
      ...student,
      registeredCourses: student?.registeredCourses?.map((c: any) => c?.course),
    };

    return transformed;
  }

  async create(data: CreateStudentDto, userId: string) {
    const { registrationNumber, level, departmentId, ...personalInfo } = data;

    return this.prismaService.student.create({
      data: {
        level,
        registrationNumber,
        departmentId,
        PersonalInformation: {
          create: {
            ...personalInfo,
          },
        },
        registeredByUserId: userId,
      },
    });
  }

  async delete(id: string) {
    return this.prismaService.student.delete({ where: { id } });
  }

  async update(id: string, data: UpdateStudentDto) {
    const { registrationNumber, level, departmentId, ...personalInfo } = data;

    return this.prismaService.student.update({
      where: {
        id,
      },
      data: {
        level,
        registrationNumber,
        departmentId,
        PersonalInformation: {
          update: {
            ...personalInfo,
          },
        },
      },
    });
  }

  async registerCourse(studentId: string, courseId: string | string[]) {
    const student = await this.find({ id: studentId });

    if (!student) throw new NotFoundException('student not found');

    const departmentsOnCourses = (
      await this.departmentService.getRegisteredCourses(student.departmentId)
    ).map((course) => course.id);

    const courses: Prisma.StudentOnCoursesCreateManyInput[] = Array.isArray(
      courseId,
    )
      ? courseId.map((id) => ({ courseId: id, studentId }))
      : [{ courseId, studentId }];

    const validCourses = courses.filter((c) =>
      departmentsOnCourses.includes(c.courseId),
    );

    return this.prismaService.studentOnCourses.createMany({
      data: validCourses,
      skipDuplicates: true,
    });
  }

  async deleteRegisteredCourses(
    studentId: string,
    courseId: string | string[],
  ) {
    const courseIds = Array.isArray(courseId) ? courseId : [courseId];

    return this.prismaService.studentOnCourses.deleteMany({
      where: {
        studentId,
        courseId: { in: courseIds },
      },
    });
  }

  async getRegisteredCourses(
    studentId: string,
    select?: Prisma.CourseFindManyArgs['select'],
  ) {
    return this.prismaService.course.findMany({
      where: {
        students: {
          some: {
            studentId,
          },
        },
      },
      select,
    });
  }

  async getRecommendedCourses(
    studentId: string,
    type: 'current' | 'recommended',
    semester?: CreateCourseDto['semester'],
  ) {
    const student = await this.find({ id: studentId });

    if (!student) throw new NotFoundException('student not found');

    const registeredCourses = (
      await this.getRegisteredCourses(studentId, { id: true })
    )?.map((course) => course.id);

    const recomendedCourses = await this.prismaService.course.findMany({
      where: {
        id: { notIn: registeredCourses },
        semester: semester,
        level: {
          ...(type == 'current'
            ? { equals: student.level }
            : { lte: student.level }),
        },
        departments: {
          some: {
            departmentId: student.departmentId,
          },
        },
      },
    });

    return recomendedCourses;
  }

  async uploadPassport(studentId: string, file: UploadedFile) {
    const student = await this.find({ id: studentId });

    if (!student?.id) throw new NotFoundException('student not found');

    const validDateRes = validateImageUtil({ file, maxSize: '700kb' });

    if (!validDateRes.isValid) {
      throw new BadRequestException(validDateRes.message);
    }

    const uploadsDir = constant.UPLOAD_DIR;

    const uploadRes = await uploadImageUtil({
      fileName: student.id,
      dir: pathJoin(process.cwd(), uploadsDir),
      file,
    });

    console.log('upload res >>>', uploadRes, student);

    if (!uploadRes.uploaded) {
      throw new InternalServerErrorException(
        'something went wrong try again later',
      );
    }

    return await this.prismaService.personalInformation.update({
      where: { studentId },
      data: {
        passport: `/${uploadsDir}/${uploadRes?.fileName}?id=${Date.now()}`,
      },
    });
  }

  async printSlip(studentId: string, userId: string) {
    const student = await this.find({ id: studentId });

    if (!student) throw new NotFoundException('student not found');

    await this.prismaService.$transaction(async (prisma) => {
      await prisma.student.update({
        where: { id: student.id },
        data: {
          printedByUserId: userId,
        },
      });

      await prisma.user.update({
        where: { id: userId },
        data: {
          token: {
            decrement: 1,
          },
          usedToken: {
            increment: 1,
          },
        },
      });
    });

    return student;
  }

  async registerRecommendedCourse(studentId: string) {
    try {
      const currentSemester = await getConfigUtil(
        this.prismaService,
        'current_semester',
      );

      const recommendedCourses = await this.getRecommendedCourses(
        studentId,
        'current',
        currentSemester,
      );

      const data =
        recommendedCourses.map<Prisma.StudentOnCoursesCreateManyInput>((c) => ({
          courseId: c.id,
          studentId,
        }));

      await this.prismaService.studentOnCourses.createMany({
        data,
        skipDuplicates: true,
      });
    } catch {}
  }
}

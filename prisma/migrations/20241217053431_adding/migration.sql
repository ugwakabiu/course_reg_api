-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('admin', 'user', 'developer') NULL DEFAULT 'user';

/*
  Warnings:

  - A unique constraint covering the columns `[menuId,userId]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Attendance_menuId_userId_key" ON "Attendance"("menuId", "userId");

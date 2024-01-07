/*
  Warnings:

  - You are about to drop the column `userId` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the `_AttendanceToMenu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_userId_fkey";

-- DropForeignKey
ALTER TABLE "_AttendanceToMenu" DROP CONSTRAINT "_AttendanceToMenu_A_fkey";

-- DropForeignKey
ALTER TABLE "_AttendanceToMenu" DROP CONSTRAINT "_AttendanceToMenu_B_fkey";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "userId",
ADD COLUMN     "menuId" TEXT;

-- DropTable
DROP TABLE "_AttendanceToMenu";

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

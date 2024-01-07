/*
  Warnings:

  - You are about to drop the column `menuId` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `registerId` on the `Menu` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_registerId_fkey";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "menuId";

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "registerId";

-- CreateTable
CREATE TABLE "_AttendanceToMenu" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AttendanceToMenu_AB_unique" ON "_AttendanceToMenu"("A", "B");

-- CreateIndex
CREATE INDEX "_AttendanceToMenu_B_index" ON "_AttendanceToMenu"("B");

-- AddForeignKey
ALTER TABLE "_AttendanceToMenu" ADD CONSTRAINT "_AttendanceToMenu_A_fkey" FOREIGN KEY ("A") REFERENCES "Attendance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendanceToMenu" ADD CONSTRAINT "_AttendanceToMenu_B_fkey" FOREIGN KEY ("B") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

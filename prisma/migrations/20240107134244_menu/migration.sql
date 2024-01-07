/*
  Warnings:

  - A unique constraint covering the columns `[staffMealChoiceId]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `staffMealChoiceId` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "staffMealChoiceId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "StaffMealChoice" (
    "id" TEXT NOT NULL,
    "breakfast" BOOLEAN NOT NULL,
    "lunch" BOOLEAN NOT NULL,
    "dinner" BOOLEAN NOT NULL,

    CONSTRAINT "StaffMealChoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_staffMealChoiceId_key" ON "Attendance"("staffMealChoiceId");

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_staffMealChoiceId_fkey" FOREIGN KEY ("staffMealChoiceId") REFERENCES "StaffMealChoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

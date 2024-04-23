/*
  Warnings:

  - You are about to drop the column `containerId` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "containerId",
ADD COLUMN     "dockerImage" TEXT,
ADD COLUMN     "releaseName" TEXT;

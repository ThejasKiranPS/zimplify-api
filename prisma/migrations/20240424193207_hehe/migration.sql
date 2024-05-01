/*
  Warnings:

  - Added the required column `userId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `source` on the `Project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "userId" UUID NOT NULL,
DROP COLUMN "source",
ADD COLUMN     "source" JSONB NOT NULL;

-- CreateTable
CREATE TABLE "Integrations" (
    "userId" UUID NOT NULL,
    "platform" TEXT NOT NULL,
    "config" JSONB NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Integrations_userId_platform_key" ON "Integrations"("userId", "platform");

-- AddForeignKey
ALTER TABLE "Integrations" ADD CONSTRAINT "Integrations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

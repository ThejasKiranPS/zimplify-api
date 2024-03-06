-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "buildCommand" TEXT NOT NULL,
    "buildDir" TEXT NOT NULL,
    "rootDir" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

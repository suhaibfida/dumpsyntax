/*
  Warnings:

  - You are about to drop the column `docId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `documentId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_docId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "docId",
ADD COLUMN     "documentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

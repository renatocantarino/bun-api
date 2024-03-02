/*
  Warnings:

  - You are about to drop the column `Name` on the `Todos` table. All the data in the column will be lost.
  - Added the required column `Description` to the `Todos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Title` to the `Todos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todos" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Done" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Todos_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Todos" ("Done", "Id", "createdAt", "ownerId", "updatedAt") SELECT "Done", "Id", "createdAt", "ownerId", "updatedAt" FROM "Todos";
DROP TABLE "Todos";
ALTER TABLE "new_Todos" RENAME TO "Todos";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

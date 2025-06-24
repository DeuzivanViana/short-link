/*
  Warnings:

  - You are about to alter the column `clicks` on the `link` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_link" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "redirect" TEXT NOT NULL,
    "createdAt" DATETIME,
    "updatedAt" DATETIME
);
INSERT INTO "new_link" ("clicks", "createdAt", "id", "redirect", "updatedAt", "userId") SELECT "clicks", "createdAt", "id", "redirect", "updatedAt", "userId" FROM "link";
DROP TABLE "link";
ALTER TABLE "new_link" RENAME TO "link";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

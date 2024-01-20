-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "createdAt" TEXT,
    "updatedAt" TEXT,
    "phone" TEXT,
    "image" TEXT
);
INSERT INTO "new_User" ("createdAt", "email", "emailVerified", "firstName", "id", "image", "lastName", "password", "phone", "updatedAt") SELECT "createdAt", "email", "emailVerified", "firstName", "id", "image", "lastName", "password", "phone", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

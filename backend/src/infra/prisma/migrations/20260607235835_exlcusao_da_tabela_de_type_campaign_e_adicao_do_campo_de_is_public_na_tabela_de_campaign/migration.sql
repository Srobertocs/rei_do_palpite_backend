/*
  Warnings:

  - You are about to drop the column `type_campaign_id` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the `TypeCampaign` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_type_campaign_id_fkey";

-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "type_campaign_id",
ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "TypeCampaign";

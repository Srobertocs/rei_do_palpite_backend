/*
  Warnings:

  - The values [GANHA,PERDIDA,PENDENTE] on the enum `CampaignOptionStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `name` on the `PaymentMethod` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypePaymentMethod" AS ENUM ('PIX', 'CARTAO_DEBITO');

-- AlterEnum
BEGIN;
CREATE TYPE "CampaignOptionStatus_new" AS ENUM ('ATIVA', 'INATIVA');
ALTER TABLE "public"."CampaignOption" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "CampaignOption" ALTER COLUMN "status" TYPE "CampaignOptionStatus_new" USING ("status"::text::"CampaignOptionStatus_new");
ALTER TYPE "CampaignOptionStatus" RENAME TO "CampaignOptionStatus_old";
ALTER TYPE "CampaignOptionStatus_new" RENAME TO "CampaignOptionStatus";
DROP TYPE "public"."CampaignOptionStatus_old";
ALTER TABLE "CampaignOption" ALTER COLUMN "status" SET DEFAULT 'ATIVA';
COMMIT;

-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CampaignOption" ALTER COLUMN "status" SET DEFAULT 'ATIVA';

-- AlterTable
ALTER TABLE "PaymentMethod" DROP COLUMN "name",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "type_method" "TypePaymentMethod" NOT NULL DEFAULT 'PIX',
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ATIVO', 'INATIVO', 'BLOQUEADO', 'PENDENTE');

-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('ATIVA', 'INATIVA', 'BLOQUEADA');

-- CreateEnum
CREATE TYPE "PaymentMethodStatus" AS ENUM ('ATIVO', 'INATIVO');

-- CreateEnum
CREATE TYPE "CampaignOptionStatus" AS ENUM ('PAGA', 'PENDENTE');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'OPERATOR');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ATIVO',
    "user_type" "UserType" NOT NULL DEFAULT 'OPERATOR',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "dt_create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comprovante" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "campaign_option_id" INTEGER NOT NULL,
    "payment_method_id" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "PaymentMethodStatus" NOT NULL DEFAULT 'ATIVO',

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignOption" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "CampaignOptionStatus" NOT NULL DEFAULT 'PENDENTE',
    "campaign_id" INTEGER NOT NULL,

    CONSTRAINT "CampaignOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" SERIAL NOT NULL,
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "dt_start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_end" TIMESTAMP(3) NOT NULL,
    "fee_operational" DECIMAL(5,2) NOT NULL,
    "campaign_value" DECIMAL(10,2) NOT NULL,
    "status" "CampaignStatus" NOT NULL DEFAULT 'ATIVA',
    "type_campaign_id" INTEGER NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeCampaign" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TypeCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_code_key" ON "Campaign"("code");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_campaign_option_id_fkey" FOREIGN KEY ("campaign_option_id") REFERENCES "CampaignOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "PaymentMethod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignOption" ADD CONSTRAINT "CampaignOption_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_type_campaign_id_fkey" FOREIGN KEY ("type_campaign_id") REFERENCES "TypeCampaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

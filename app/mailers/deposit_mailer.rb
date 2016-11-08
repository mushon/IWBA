class DepositMailer < ApplicationMailer

  def deposit_mail(deposit)
    @deposit = deposit
    mail(to: @deposit.email, subject: '💧IWBA: Your Water Portfolio is ready')
  end
end

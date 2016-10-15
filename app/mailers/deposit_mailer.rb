class DepositMailer < ApplicationMailer

  def deposit_mail(deposit)
    @deposit = deposit
    mail(to: @deposit.email, subject: 'IWBA :: Water is safely deposited')
  end
end

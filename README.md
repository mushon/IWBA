#![IWBA](https://raw.githubusercontent.com/mushon/IWBA/master/app/assets/images/IWBA_logo.png)
The International Water Bank Association's Water Deposit exhibit - a water ATM for depositing your first drops

### About IWBA
The International Water Banking Association is a proud sponsor of the exhibition. Serving as an umbrella organization for some of the world's leading water banks, the IWBA promotes and facilitates investment in emerging drought market opportunities. In the exhibition space we are excited to launch a new water deposit kiosk inviting the audience to start their water investment portfolio by pouring water into the pipe and then choose to diversify their investment throughout our growing selection of future drought stricken markets. Satisfy your thirst for profit and invest wisely as tomorrow’s drought is today’s opportunity.

### About The Chronicles of a Prepper Exhibition Trilogy
[The Chronicles of a Prepper](http://www.ddp.or.kr/event/detail/1229?menuId=20) is a trilogy that examines air, food and water from the perspective of a prepper, who is actively preparing for emergencies, such as tsunami, terrorist attack, nuclear explosion, financial crisis, and/or other crises. The trilogy is curated by Hyewon Lee, Part 1 was opened on November 8th 2016 in Seoul's Dongdaemun Design Plaza.

### Credits
Concept and production by [Mushon Zer-Aviv](http://mushon.com) & [Wonyoung So](http://wonyoung.so)

Special thanks to Hyewon Lee and Sungil Lee

## Install

### Updating server to heroku

1. (important) recompile javascript
`rm -rf public/webpack`
`bundle exec rake webpack:compile`

2. push all code into github repository
`git pull`
`git add .`
`git commit -m 'update'`
`git push`

2. heroku login (skip if you already logged in)

`heroku login`
And type your heroku email and password

4. `git push heroku master`

### Render email on local
In order to test email on local, we need to open one more tab in terminal. After pulling latest code, open a terminal tab and type in terminal 

`bundle exec sidekiq -q default -q mailers`

and after you've done the test, the mail can be checked at http://mailtrap.io, I'll give you the credential in private message..



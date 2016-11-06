# IWBA
The International Water Bank Association's Water Deposit exhibit - a water ATM for depositing your first drops

## Updating server to heroku

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

## Render email on local
In order to test email on local, we need to open one more tab in terminal. After pulling latest code, open a terminal tab and type in terminal 

`bundle exec sidekiq -q default -q mailers`

and after you've done the test, the mail can be checked at http://mailtrap.io, I'll give you the credential in private message..



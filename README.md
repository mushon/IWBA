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



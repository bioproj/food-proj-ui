cd dist
git init
git remote add github git@github.com:bioproj/pipeline-proj-ui.git
git add .
git commit -m 'update'
git branch main
git push -u github main -f
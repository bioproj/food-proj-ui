yarn build


cd dist

git clone -b main --single-branch git@github.com:bioproj/pipeline-proj-ui.git 
cd pipeline-proj-ui
git reset d737c5f5cddcc06939ff5b6e2d53366790a8ba79 --hard


mv ../*  .

git add .
git commit -m 'update'

git push -u origin main -f 
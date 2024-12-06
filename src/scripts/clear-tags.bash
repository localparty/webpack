git tag -l | xargs git tag -d
for t in $(git ls-remote --tags origin | sed 's/.*refs\/tags\/\(.*\)/\1/'); do
  git push origin :refs/tags/$t
done
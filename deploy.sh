#!/bin/bash
set -e # exit with nonzero exit code if anything fails

# clear the dist directory
rm -rf dist || exit 0;

# get the existing gh-pages history, but clean out the files.
git clone --quiet --branch=gh-pages https://bwinton:${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git dist > /dev/null
cd dist
rm -rf *
cd ..

# run our compile script, discussed above
npm run build

# inside the gh-pages repo we'll pretend to be a new user
cd dist
git config user.name "Travis CI"
git config user.email "firefox-ux-team@mozilla.com"

if [ -n "$(git status --porcelain)" -a "${TRAVIS_PULL_REQUEST}" == "false" ]; then
  git add -Af .
  git commit -m "Deploy ${TRAVIS_COMMIT_RANGE} to GitHub Pages."

  # Force push from the current repo's master branch to the remote
  # repo's gh-pages branch. (All previous history on the gh-pages branch
  # will be lost, since we are overwriting it.) We redirect any output to
  # /dev/null to hide any sensitive credential data that might otherwise be exposed.
  git push --force --quiet "https://bwinton:${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git" gh-pages
fi

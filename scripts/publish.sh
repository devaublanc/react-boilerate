#!/bin/bash

# works with a file called VERSION in the current directory,
# the contents of which should be a semantic version number
# such as "1.2.3"

# this script will display the current version, automatically
# suggest a "minor" version update, and ask for input to use
# the suggestion, or a newly entered value.

# once the new version number is determined, the script will
# pull a list of changes from git history, prepend this to
# a file called CHANGES (under the title of the new version
# number) and create a GIT tag.

set +x

if [ -f VERSION ]; then
    git fetch origin HEAD
    BASE_STRING=`cat VERSION`
    BASE_LIST=(`echo $BASE_STRING | tr '.' ' '`)
    V_MAJOR=${BASE_LIST[0]}
    V_MINOR=${BASE_LIST[1]}
    V_PATCH=${BASE_LIST[2]}
    echo "Current version : $BASE_STRING"
    V_MINOR=$((V_MINOR + 1))
    V_PATCH=0
    SUGGESTED_VERSION="$V_MAJOR.$V_MINOR.$V_PATCH"
    read -p "Enter a version number [$SUGGESTED_VERSION]: " INPUT_STRING
    if [ "$INPUT_STRING" = "" ]; then
        INPUT_STRING=$SUGGESTED_VERSION
    fi
    echo "# Version $INPUT_STRING:" > tmpfile
    git log --pretty=format:" - %s" "v$BASE_STRING"...HEAD --no-merges >> tmpfile
    echo "" >> tmpfile
    echo "" >> tmpfile
    echo -e "\nCHANGELOG:"
    cat tmpfile
    read -p "Do you validate the CHANGELOG above? (y/N) " CHANGELOG_ACCEPTED
    if [ "$CHANGELOG_ACCEPTED" = "y" ]; then
        echo "CHANGELOG accepted."
    else
        echo "The CHANGELOG was not accepted, existing publish script now."
        exit 1
    fi
    echo "Will set new version to be $INPUT_STRING"
    npm version --no-git-tag-version $INPUT_STRING
    echo $INPUT_STRING > VERSION
    cat CHANGELOG.md >> tmpfile
    mv tmpfile CHANGELOG.md
    git add CHANGELOG.md VERSION package.json
    git commit -m "Publish release $INPUT_STRING"
    git tag -a -m "Tagging version $INPUT_STRING" "v$INPUT_STRING"
    git push && git push origin --tags
fi

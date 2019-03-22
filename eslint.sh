#!/bin/bash
# eslint检查，只检查修改的文件
#
# If you absolutely must commit without testing,
# use: git commit --no-verify

# This will check only staged files to be commited.
list=$@;


if [[ "$list" = "" ]]; then
  exit 0
fi

PASS=true;

for FILE in $list
do
  ./node_modules/.bin/eslint --fix --config=./.eslintrc.json \
  --ignore-path=./.eslintignore --ext=.js \
  --color "$FILE";

  if [[ "$?" != 0 ]]; then
    echo "ESLint Failed: $FILE"
    PASS=false
  fi
done

echo "Javascript validation completed!"

if ! $PASS; then
  echo -e "commit failed: Your commit contains files that should pass ESLint but do not. Please fix the ESLint errors and try again."
  exit 1
else
  echo "well done!"
fi
exit $?



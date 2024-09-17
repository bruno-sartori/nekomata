by [Bruno Sartori](https://www.linkedin.com/in/bruno-sartori-dev)

Introduction
============

The use of [Semantic Versioning](https://dev.to/brunosartori/a-practical-guide-to-semantic-versioning-how-and-when-to-update-your-versions-2c19) is very important to keep your users informed about changes that may impact how they interact with the software, maintain compatibility between libraries, facilitate collaboration among teams by reducing conflicts and communication failures regarding the current state of the software, among many other things. That said, keeping semantic versioning flawless can be quite a challenge, either because not everyone who contributes to the code practices it correctly — such as incorrectly changing the MAJOR, MINOR, and PATCH components — or because we may simply forget to update the version before committing or pushing the code to the repository. In any case, manual processes are always prone to human error, so it would be interesting if we could create an automated way to validate whether a version bump is necessary to prevent potential issues. Fortunately, Git has hooks, which are scripts that Git automatically runs before or after certain events like commit or push. We can leverage them to alert us to possible changes that break code compatibility, keeping semantic versioning neat and tidy **😊**.

What is Husky?
==============

[Husky](https://github.com/typicode/husky) is an NPM package that makes it easy to integrate Git Hooks into your project. It can be used to automate tasks such as running tests, linters, etc. It is extremely fast and weighs only 2kb. Additionally, with Husky, we can create hooks using **POSIX shell scripts**.

How to install Husky
====================

Use your favorite package manager to install the dependency:

```
yarn add --dev husky
```

Use [NPX](https://github.com/npm/npx) to automatically setup husky for you:

```
npx husky init
```

This will create a `pre-commit` script in `.husky/` folder and updates `prepare` script in your `package.json` file. Boom! its all good to go.

Creating a pre-commit hook to validate possible breaking changes in the code and prevent us from pushing them without incrementing MAJOR version.
=================================================================================================================================================

On `.husky/` folder, open the `pre-commit` file that Husky has already created for you and paste the following code. Don’t worry, we will talk about what it’s doing in a second.

```bash
yellow='\\033[0;33m'
green='\\033[0;32m'
blue='\\033[0;34m'
red='\\033[0;31m'
no_color='\\033[0m'

ABORT_IF_ANY_VERSION_WAS_NOT_UPDATED=0
ABORT_IF_MAJOR_VERSION_WAS_NOT_UPDATED=1

POTENTIALLY_BREAKABLE_CHANGES=0

set -o nounset

compare_strings() {
  old_string="$1"
  new_string="$2"
  
  # Initialize the resulting string
  result=""
  
  # Initialize the indexes
  i=0
  j=0
  
  # Traverse the new string and compare it with the old string
  while [ $i -lt ${#new_string} ]; do
    new_char="${new_string:i:1}"
    old_char="${old_string:j:1}"
    
    # If the character from the new string is equal to the old one, add it without highlight
    if [ "$new_char" = "$old_char" ]; then
      result="$result$new_char"
      i=$((i+1))
      j=$((j+1))
    else
      # If the character from the new string is not in the old string, highlight it in green
      if [ "$new_char" != "$old_char" ] && [ ! "$new_char" = "$old_char" ]; then
        result="$result${green}${new_char}${no_color}"
        i=$((i+1))
      else
        # Add characters from the old string until finding the matching character
        while [ "$new_char" != "$old_char" ] && [ $j -lt ${#old_string} ]; do
          result="$result${red}${old_char}${no_color}"
          j=$((j+1))
          old_char="${old_string:j:1}"
        done
      fi
    fi
  done
  
  # Add the remaining characters from the old string, if any
  while [ $j -lt ${#old_string} ]; do
    result="$result${red}${old_string:j:1}${no_color}"
    j=$((j+1))
  done
  
  # Return the result
  echo -e "${result}"
}

printf "${blue}Initializing Husky${no_color}\\n"

REPO_ROOT=$(git rev-parse --show-toplevel)

SITE_CHANGES=$(git status -s "$REPO_ROOT" | wc -l)

printf "Detected ${yellow}$SITE_CHANGES${no_color} changes\\n"

if [ "$SITE_CHANGES" -gt 0 ]; then
  
  # Check files for function signature changes
  CHANGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\\.(ts|tsx|js|jsx)$')
  
  if [ -n "$CHANGED_FILES" ]; then
    printf "${blue}Checking TypeScript files for potentially breakable changes...${no_color}\\n"
    
    # Define the regex pattern and dont ask me how I get this right (hint: ends with "gpt")
    REGEX="function\\s+[a-zA-Z_$][0-9a-zA-Z_$]*\\s*\\([^)]*\\)(?:\\s*:\\s*[a-zA-Z_$][0-9a-zA-Z_$]*)?\\s*(?:;|\\{)|[a-zA-Z_$][0-9a-zA-Z_$]*\\s*=\\s*\\([^)]*\\)(?:\\s*:\\s*[a-zA-Z_$][0-9a-zA-Z_$]*)?\\s*=>\\s*[^\\{]*?(?:;|\\s*)|(?:public|private|protected)?\\s*[a-zA-Z_$][0-9a-zA-Z_$]*\\s*\\([^)]*\\)(?:\\s*:\\s*[a-zA-Z_$][0-9a-zA-Z_$]*)?\\s*(?:;|\\{)"
  
    # Iterate over staged TypeScript files
    for FILE in $CHANGED_FILES; do
      if [[ -f "$REPO_ROOT/$FILE" ]]; then
        printf "Checking file ${yellow}$FILE${no_color}...\\n"
  
        # Get added and removed changes
        STAGED_ADDITIONS=$(git diff --cached "$REPO_ROOT/$FILE" | grep -E "^\\+[^+]" | sed 's/^\\+//')
        STAGED_REMOVALS=$(git diff --cached "$REPO_ROOT/$FILE" | grep -E "^\\-[^-]" | sed 's/^\\-//')
        
        ADDITIONS_MATCHED=""
        REMOVALS_MATCHED=""
        
        # Check if STAGED_ADDITIONS is not empty and execute grep if not
        if [ -n "$STAGED_ADDITIONS" ]; then
          # Capture the part that matches the regex
          ADDITIONS_MATCHED=$(printf "%s" "$STAGED_ADDITIONS" | grep -P -o "$REGEX" || true)
        fi
        
        # Check if STAGED_REMOVALS is not empty and execute grep if not
        if [ -n "$STAGED_REMOVALS" ]; then
          # Capture the part that matches the regex
          REMOVALS_MATCHED=$(printf "%s" "$STAGED_REMOVALS" | grep -P -o "$REGEX" || true)
        fi
        
        if [ -n "$ADDITIONS_MATCHED" ]; then
          printf "${red}Signature changes detected in ${yellow}$FILE${no_color}. Showing changes:\\n"
          # Call the function and display the result
          compare_strings "$REMOVALS_MATCHED" "$ADDITIONS_MATCHED"
          POTENTIALLY_BREAKABLE_CHANGES=1
        fi
      fi
    done
    
    if [ "$POTENTIALLY_BREAKABLE_CHANGES" -eq 1 ]; then
      printf "Checking to make sure package version was updated...\\n"
      
      if [ "$ABORT_IF_ANY_VERSION_WAS_NOT_UPDATED" -eq 1 ]; then
        VERSION_CHANGED=$(git diff -G '"version":' --cached package.json | wc -l)

        if [ "$VERSION_CHANGED" -gt "0" ]; then
          printf "${green}Version was updated!  Continuing...${no_color}\\n"
        else
          printf "${red}Version was not updated :( Aborting commit.${no_color}\\n"
          exit 1
        fi
      elif [ "$ABORT_IF_MAJOR_VERSION_WAS_NOT_UPDATED" -eq 1 ]; then
        CURRENT_VERSION=$(grep -oP '"version":\\s*"\\K[0-9]+\\.[0-9]+\\.[0-9]+"' package.json | tr -d '"')
        CURRENT_MAJOR=$(echo "$CURRENT_VERSION" | cut -d'.' -f1)
        
        STAGED_VERSION=$(git diff --cached package.json | grep -oP '"version":\\s*"\\K[0-9]+\\.[0-9]+\\.[0-9]+"' | tr -d '"')
        STAGED_MAJOR=$(echo "$STAGED_VERSION" | cut -d'.' -f1)
        
        if [ -n "$STAGED_MAJOR" ]; then
          # Check if the MAJOR version has changed
          if [ "$CURRENT_MAJOR" != "$STAGED_MAJOR" ]; then
            printf "${green}MAJOR version was updated! Continuing...${no_color}\\n"
          else
            printf "${red}MAJOR version was not updated :( Aborting commit.${no_color}\\n"
          fi
        else 
          printf "${red}MAJOR version was not updated :( Aborting commit.${no_color}\\n"
          exit 1
        fi
      fi
    fi
  fi
fi
```

Now let’s dive into this code for a minute and see what it is doing.

### 1. Script Initialization


```bash
yellow='\\033[0;33m'
green='\\033[0;32m'
blue='\\033[0;34m'
red='\\033[0;31m'
no_color='\\033[0m'

ABORT_IF_ANY_VERSION_WAS_NOT_UPDATED=0
ABORT_IF_MAJOR_VERSION_WAS_NOT_UPDATED=1

POTENTIALLY_BREAKABLE_CHANGES=0

set -o nounset
```

*   First, we create some variables for changing the color of the output.
*   The two flags `ABORT_IF_ANY_VERSION_WAS_NOT_UPDATED` and `ABORT_IF_MAJOR_VERSION_WAS_NOT_UPDATED` let’s you have some control of when to abort the push process.
*   `POTENTIALLY_BREAKABLE_CHANGES` is a flag to identify if the script has found a breakable change in potential.
*   `set -o nounset`: This enables a mode where using undeclared variables will trigger an error. It helps avoid accidental errors by ensuring that all variables are defined before being used.

### 2. compare_strings Function

```bash
compare_strings() {
  old_string="$1"
  new_string="$2"
  
  # Initialize the resulting string
  result=""
  
  # Initialize the indexes
  i=0
  j=0
 
  # Traverse the new string and compare it with the old string
  while [ $i -lt ${#new_string} ]; do
    new_char="${new_string:i:1}"
    old_char="${old_string:j:1}"
```

*   The `compare_strings` function will be used to print what was changed in function`s signatures of the staged files.
*   The `while` loop iterates through each character of the `new_string` and compares it to the corresponding character in the `old_string`. `new_char` and `old_char` hold the current characters from each string, based on their indexes.

```bash
if [ "$new_char" = "$old_char" ]; then
  result="$result$new_char"
  i=$((i+1))
  j=$((j+1))
else
  if [ "$new_char" != "$old_char" ] && [ ! "$new_char" = "$old_char" ]; then
    result="$result${green}${new_char}${no_color}"
    i=$((i+1))
  else
    while [ "$new_char" != "$old_char" ] && [ $j -lt ${#old_string} ]; do
      result="$result${red}${old_char}${no_color}"
      j=$((j+1))
      old_char="${old_string:j:1}"
    done
  fi
fi
```

*   If the current characters from both strings match, the character from the `new_string` is appended to the `result` without any highlighting.
*   The indexes `i` and `j` are incremented to move to the next character in both strings.
*   If the current character from the `new_string` differs from the `old_string`, the character from `new_string` is highlighted in green (using `green` and `no_color`) and added to the `result`.
*   The index `i` is incremented to move to the next character of the `new_string`.
*   If the characters don’t match and the `new_char` is not present in the `old_string`, the function iterates through the `old_string` until a match is found, highlighting the unmatched characters in red (indicating they have been removed).
*   `j` is incremented while traversing the `old_string`.

```bash
while [ $j -lt ${#old_string} ]; do
  result="$result${red}${old_string:j:1}${no_color}"
  j=$((j+1))
done
  
echo -e "${result}"
```

*   After comparing all characters in the `new_string`, if there are remaining characters in the `old_string`, they are appended to the `result` highlighted in red to indicate they were removed.
*   Finally, the function prints the `result`, which contains the compared strings with characters highlighted to indicate additions (green) or removals (red).

### 3. Finding updates in function’s signature


```bash
printf "${blue}Initializing Husky${no_color}\\\\n"

REPO_ROOT=$(git rev-parse --show-toplevel)
SITE_CHANGES=$(git status -s "$REPO_ROOT" | wc -l)

printf "Detected ${yellow}$SITE_CHANGES${no_color} changes\\\\n"

if [ "$SITE_CHANGES" -gt 0 ]; then
  
  # Check files for function signature changes
  CHANGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\\\\.(ts|tsx|js|jsx)$')
  
  if [ -n "$CHANGED_FILES" ]; then
    printf "${blue}Checking TypeScript files for potentially breakable changes...${no_color}\\\\n"
    
    # Define the regex pattern and dont ask me how I get this right (hint: ends with "gpt")
    REGEX="function\\\\s+[a-zA-Z_$][0-9a-zA-Z_$]*\\\\s*\\\\([^)]*\\\\)(?:\\\\s*:\\\\s*[a-zA-Z_$][0-9a-zA-Z_$]*)?\\\\s*(?:;|\\\\{)|[a-zA-Z_$][0-9a-zA-Z_$]*\\\\s*=\\\\s*\\\\([^)]*\\\\)(?:\\\\s*:\\\\s*[a-zA-Z_$][0-9a-zA-Z_$]*)?\\\\s*=>\\\\s*[^\\\\{]*?(?:;|\\\\s*)|(?:public|private|protected)?\\\\s*[a-zA-Z_$][0-9a-zA-Z_$]*\\\\s*\\\\([^)]*\\\\)(?:\\\\s*:\\\\s*[a-zA-Z_$][0-9a-zA-Z_$]*)?\\\\s*(?:;|\\\\{)"
  
    for FILE in $CHANGED_FILES; do
      if [[ -f "$REPO_ROOT/$FILE" ]]; then
        printf "Checking file ${yellow}$FILE${no_color}...\\\\n"
        
        STAGED_ADDITIONS=$(git diff --cached "$REPO_ROOT/$FILE" | grep -E "^\\\\+[^+]" | sed 's/^\\\\+//')
        STAGED_REMOVALS=$(git diff --cached "$REPO_ROOT/$FILE" | grep -E "^\\\\-[^-]" | sed 's/^\\\\-//')
        
        if [ -n "$ADDITIONS_MATCHED" ]; then
          printf "${red}Signature changes detected in ${yellow}$FILE${no_color}. Showing changes:\\\\n"
          compare_strings "$REMOVALS_MATCHED" "$ADDITIONS_MATCHED"
          POTENTIALLY_BREAKABLE_CHANGES=1
        fi
      fi
    done
```

*   `REPO_ROOT` is set to the root directory of the git repository using `git rev-parse --show-toplevel`.
*   `SITE_CHANGES` counts the number of changes detected in the repository using `git status` and `wc -l` (to count the lines in the output).
*   If changes are detected in the repository, the script looks for staged files that match the extensions `.ts`, `.tsx`, `.js`, or `.jsx` using `git diff --cached`. These files are stored in `CHANGED_FILES`.
*   If there are changed files, the script informs the user and defines a `REGEX` pattern to identify function signatures, arrow functions, and class methods in TypeScript or JavaScript files.
*   The script then iterates over each file in `CHANGED_FILES`, checking if it exists in the repository root.
*   `STAGED_ADDITIONS` and `STAGED_REMOVALS` capture the added and removed lines from the staged files by filtering lines starting with `+` or `-`.
*   If there are any function signature changes detected, the `compare_strings` function is called to highlight the differences between the added and removed function signatures and sets the flag `POTENTIALLY_BREAKABLE_CHANGES` to 1 (true).

### 4. Check for Version Updates


```bash
if [ "$POTENTIALLY_BREAKABLE_CHANGES" -eq 1 ]; then
  printf "Checking to make sure package version was updated...\\n"
  
  if [ "$ABORT_IF_ANY_VERSION_WAS_NOT_UPDATED" -eq 1 ]; then
    VERSION_CHANGED=$(git diff -G '"version":' --cached package.json | wc -l)

    if [ "$VERSION_CHANGED" -gt "0" ]; then
      printf "${green}Version was updated!  Continuing...${no_color}\\n"
    else
      printf "${red}Version was not updated :( Aborting commit.${no_color}\\n"
      exit 1
    fi
  elif [ "$ABORT_IF_MAJOR_VERSION_WAS_NOT_UPDATED" -eq 1 ]; then
    CURRENT_VERSION=$(grep -oP '"version":\\s*"\\K[0-9]+\\.[0-9]+\\.[0-9]+"' package.json | tr -d '"')
    CURRENT_MAJOR=$(echo "$CURRENT_VERSION" | cut -d'.' -f1)
    
    STAGED_VERSION=$(git diff --cached package.json | grep -oP '"version":\\s*"\\K[0-9]+\\.[0-9]+\\.[0-9]+"' | tr -d '"')
    STAGED_MAJOR=$(echo "$STAGED_VERSION" | cut -d'.' -f1)
    
    if [ -n "$STAGED_MAJOR" ]; then
      # Check if the MAJOR version has changed
      if [ "$CURRENT_MAJOR" != "$STAGED_MAJOR" ]; then
        printf "${green}MAJOR version was updated! Continuing...${no_color}\\n"
      else
        printf "${red}MAJOR version was not updated :( Aborting commit.${no_color}\\n"
      fi
    else 
      printf "${red}MAJOR version was not updated :( Aborting commit.${no_color}\\n"
      exit 1
    fi
  fi
fi
```

*   If potencial breakable changes are detected, the script checks for the two flags for defining when to abort the process. if `ABORT_IF_ANY_VERSION_WAS_NOT_UPDATED` is set to true, it checks whether the `package.json` version was updated. If not, the commit is aborted with a message.
*   if `ABORT_IF_MAJOR_VERSION_WAS_NOT_UPDATED` is set to true, it extracts the `CURRENT_VERSION` of the `package.json` file using `grep`. The regular expression captures the version (e.g., `1.2.3`), and `tr -d '"'` removes the surrounding double quotes.
*   Then it extracts the `CURRENT_MAJOR` version part (e.g., `1` from `1.2.3`) using `cut -d'.' -f1`, which splits the version by dots and selects the first part.
*   It does the same thing for the `STAGED_VERSION` and `STAGED_MAJOR` but using `git diff --cached` to capture the differences in `package.json` file.
*   Finally, it compares the **current and staged major versions**. If they are different, it means the **MAJOR version** was updated correctly, and the script prints a success message and continues. If the major versions are the same, it prints an error message and aborts the commit process with `exit 1`.

Using our Hook
==============

To verify the hook running, change some random function’s signature like this:

![Updating function signature 1](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vm5mg5ijv1vf8c8s6c4k.png)

![Updating function signature 2](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a3ke773llcfvvqs6a9yo.png)

![Updating function signature 3](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/syx7zyxdrc0zaq3g6gkb.png)

![Updating function signature 44](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hxiy9hm3mlqojl49j5vi.png)

Then, run the command `git add --all` and commit try to commit them using `git commit -m 'my hook test'`, the hook will execute and you will see the following message:

![Hook aborting commit](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/v8uu3xuz378kyydfhfp0.png)

And that’s it! the commit process will be aborted and you will not be able to commit changes until you increment the MAJOR version in your `package.json` file. If you do that, the hook will allow you to commit like this:

![Hook allowing commit](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ldy3fr4jw4xnvhmk7sdg.png)

Improving the script
====================

As much as this script can help you manage semantic versioning, it is still very rudimentary, and there is room for several improvements. Some possible enhancements include:

*   Better analyzing the tested function to understand if it directly interacts with the end user of the code, increasing the certainty that changing its signature constitutes a breakable change.
*   Looking for changes in API route addresses.
*   Searching for changes in the contract of input and output types.

If you liked this script and would like to help improve it, feel free to make modifications. And, if you’d like, send me your changes so I can also benefit from your improvements 😂

For now, this script is hosted in a [Gist](https://gist.github.com/bruno-sartori/91666eb457dacc5ec8072055c1fe4174#file-pre-push-sh), but I could create a repository where you can submit a PR, allowing us to track contributions from collaborators.

Conclusion
==========

Integrating Husky with Git hooks allows us to automate the process of checking for potentially breaking changes in code and enforcing semantic versioning best practices. By utilizing scripts like the one demonstrated, we can identify updates in function signatures and ensure that the MAJOR version is incremented when necessary, reducing the risk of introducing breaking changes without proper versioning. This approach helps maintain a clean, organized versioning system while minimizing human error, allowing teams to collaborate more effectively and safely push code changes without compromising software stability.

Further Reading
===============

Don’t forget to check out my article on [Semantic Versioning](https://dev.to/brunosartori/a-practical-guide-to-semantic-versioning-how-and-when-to-update-your-versions-2c19). And if you’re curious about how to showcase your GitHub repositories on LinkedIn, [this one’s for you](https://dev.to/brunosartori/how-to-highlight-your-github-repositories-on-linkedin-pg1)!

If you enjoyed this article, please leave that naughty like and if you got questions drop them in the comments **🙌**

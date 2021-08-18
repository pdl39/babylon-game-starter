# CHANGE LOG

All notable changes to **`babylonjs-game-starter`** will be documented here.

<br/>

# [Unreleased] ~

<br/>

# [1.1.2] 2021-08-18

### Changed

- CHANGELOG.md
  - Updated project info log at the end of installation to use properties from package.json

<br/>

# [1.1.1] 2021-08-18

## _This release fixed the issue of .gitignore copy resulting in error when user installs the project._

<br/>

### Fixed

- .gitignore copy should now work

<br/>

# [1.1.0] 2021-08-18

### Fix of .gitignore copy error attempted but failed.\_

<br/>

### Changed

- db.js
  - Refactored commented code
- renderStoryScene.ts
  - Changed color to yello

<br/>

# [1.0.2] 2021-08-17

### Added

- CHANGELOG.md

### Changed

- README.md
  - Added new sections:
    - Notes on Configuration
    - Requirements
    - Current Known Issues
  - Added more detailed explanation for running server script
  - Changed formatting
- package.json
  - Added engines:
    - `node: ~v14.17.5`
    - `npm: ~6.14.14`
- tsconfig.json
  - Removed commented out reference
- bin/bgs.js
  - Added .on 'open' and 'error' checker for fs.createReadStream in `copyFile`
  - Updated package.json generation to include engines
  - Updated formatting of log messages
  - Removed logging for argv and argv length

<br/>

# [1.0.1] 2021-08-16

### Changed

- bin/bgs.js
  - Removed unused imports
  - Added licence.md to files to skip
  - Added logging for argv and argv length

### Removed

- /test-directory

<br/>

# [1.0.0] 2021-08-16

### First Release

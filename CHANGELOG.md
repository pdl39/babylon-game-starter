# CHANGE LOG
All notable changes to **`babylonjs-game-starter`** will be documented here.

<br/>

# [Unreleased] ~2021-08-17
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

# Version Decider

A GitHub action for deciding if new a version should be released

[![Build](https://github.com/thiagodnf/version-decider/actions/workflows/build.yml/badge.svg)](https://github.com/thiagodnf/version-decider/actions/workflows/build.yml)
[![GitHub Release](https://img.shields.io/github/release/thiagodnf/version-decider.svg)](https://github.com/thiagodnf/version-decider/releases/latest)
[![GitHub contributors](https://img.shields.io/github/contributors/thiagodnf/version-decider.svg)](https://github.com/thiagodnf/version-decider/graphs/contributors)
[![GitHub stars](https://img.shields.io/github/stars/thiagodnf/version-decider.svg)](https://github.com/thiagodnf/version-decider)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

## Usage

You can now consume the action by referencing the available version.

```yaml
- id: version-decider
  name: Version Decider
  uses: thiagodnf/version-decider@v1.0.7
  with:
    file: ./package.json
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Now you can use the output to run the next actions such as:

```yaml
- name: Creating a new release on Github
  uses: softprops/action-gh-release@v1
  if: steps.version-decider.outputs.new
  with:
    name: v${{ steps.version-decider.outputs.version }}
    tag_name: v${{ steps.version-decider.outputs.version }}
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Input

### `file`

**Required** The configuration file

## Outputs

### `version`
Current Version

### `release`
Current Release Version

### `new`
True if a new version should be released

## Questions or Suggestions

Feel free to access the <a href="../../discussions">discussions tab</a> as you need

## Contribute

Contributions to this project are very welcome! We can't do this alone! Feel free to fork this project, work on it and then make a pull request.

## License

Licensed under the [MIT license](LICENSE).

## Donate

I open-source almost everything I can, and I try to reply to everyone needing help using these projects. Obviously, this takes time. You can integrate and use these projects in your applications for free! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, reach out to me if you want to do it.

Thanks!

❤️

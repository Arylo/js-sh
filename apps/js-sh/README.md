# @js-sh/js-sh

## Install

```bash
npm i @js-sh/js-sh
```

## Usage

### Example

```javascript
import { ls, cp, mkdir, rm } from '@js-sh/js-sh'

const CACHE_FOLDER = '.nyc_output'

rm(CACHE_FOLDER)
mkdir(CACHE_FOLDER)

ls('./apps/*/coverage/coverage-final.json')
  .forEach((p) => {
    cp(p, `${CACHE_FOLDER}/`)
  })
```

## Functions

### $(command: string)

```javascript
import { $ } from '@js-sh/js-sh'

await $('npm run test')
```

### within(callback: Function)

```javascript
import { within } from '@js-sh/js-sh'

within(() => {
  cd('./oneFolder')
})

await within(async () => {
  cd('./otherFolder')
})
```

### retry(time: number, callback: Function)

```javascript
import { retry } from '@js-sh/js-sh'

await retry(3, async () => {
  // ...
})
```

### cat(path: string)

```javascript
import { cat } from '@js-sh/js-sh'

cat('./package.json')
```

### cd(path: string)

```javascript
import { cd } from '@js-sh/js-sh'

cd('./apps')
```

### cp(source: string, target: string)

#### Copy File to File

```javascript
import { cp } from '@js-sh/js-sh'

cp('./package.json', './package-backup.json')
```

#### Copy File into Folder

```javascript
import { cp } from '@js-sh/js-sh'

cp('./package.json', './targetFolder/')
```

#### Copy Folder to Folder

```javascript
import { cp } from '@js-sh/js-sh'

cp('./sourceFolder/*', './targetFolder')
```

#### Copy Folder into Folder

```javascript
import { cp } from '@js-sh/js-sh'

cp('./sourceFolder', './targetFolder/')
```

### echo(content: string)

```javascript
import { echo } from '@js-sh/js-sh'

echo('Hello World')
```

### ls(path: string | string[])

```javascript
import { ls } from '@js-sh/js-sh'

ls('./')
ls('./package.json')
ls('./apps', './packages')
```

### mkdir(path: string)

```javascript
import { mkdir } from '@js-sh/js-sh'

mkdir('./newFolder')
```

### mv(source: string, target: string)

#### Move File to File

```javascript
import { mv } from '@js-sh/js-sh'

mv('./package.json', './package-backup.json')
```

#### Move File into Folder

```javascript
import { mv } from '@js-sh/js-sh'

mv('./package.json', './targetFolder/')
```

#### Move Folder to Folder

```javascript
import { mv } from '@js-sh/js-sh'

mv('./sourceFolder/*', './targetFolder')
```

#### Move Folder into Folder

```javascript
import { mv } from '@js-sh/js-sh'

mv('./sourceFolder', './targetFolder/')
```

### pwd()

Default return the `process.cwd()` value until you use the `cd` method

```javascript
import { pwd } from '@js-sh/js-sh'

pwd()
```

### rm(path: string)

```javascript
import { rm } from '@js-sh/js-sh'

rm('./oldFolder')
```

### sleep(time: number)

```javascript
import { sleep } from '@js-sh/js-sh'

await sleep(50)
```

### exit(code: number, msg?: string)

```javascript
import { exit } from '@js-sh/js-sh'

exit(0, 'Bye~')
```

### readFile(filepath: string, encoding?: string)

```javascript
import { readFile } from '@js-sh/js-sh'

readFile('foo.txt', 'utf-8')
```

### writeFile(filepath: string, data: any, encoding?: string)

```javascript
import { writeFile } from '@js-sh/js-sh'

writeFile('foo.txt', '["Test"]', 'utf-8')
```

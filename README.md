# fix-cwd

Fix the current working directory by resolving it to its OS-canonical path before running a command.

Some tools incorrectly set `process.cwd()` to a path with a lowercase drive letter on Windows (e.g. `c:\project` instead of `C:\Project`). This causes issues with `require.resolve`, `import.meta.url`, `import.meta.dirname`, and other path-sensitive APIs. `fix-cwd` resolves the cwd to its true path using `fs.realpathSync.native()` before spawning your command.

## Install

```sh
npm install --save-dev fix-cwd
```

## Usage

Prefix your scripts with `fix-cwd`:

```jsonc
{
  "scripts": {
    "dev": "fix-cwd vitest",
    "build": "fix-cwd vite build"
  }
}
```

## How it works

1. Calls `fs.realpathSync.native(".")` to get the OS-canonical path of the current directory
2. Spawns your command with the corrected cwd
3. Forwards signals and exit codes transparently

On Windows, `realpathSync.native` calls `GetFinalPathNameByHandle`, which returns the true-cased path (uppercase drive letter, correct directory casing). On Linux/macOS, it's effectively a no-op.

## License

MIT
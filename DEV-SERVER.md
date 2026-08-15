# Dev Server Port Policy

**Rule: never kill whatever is already listening on port 3000 without checking first.** If you (the developer) have your own `npm run dev` running on port 3000, force-killing it interrupts your work and loses your terminal session.

## Before starting a dev server for verification

1. Check if port 3000 is already in use:

   ```powershell
   Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
   ```

2. If something is already listening there:
   - **Assume it's your dev server — do not touch it.**
   - Verify on a different port instead, e.g.:

     ```bash
     npm run dev -- -p 3010
     ```

   - Or skip spinning up a dev server at all and rely on `npm run lint`, `npx tsc --noEmit`, and `npm run build` for verification.

3. Only stop a process on port 3000 if:
   - It's a server that was started earlier in the same working session for testing purposes (known origin, safe to clean up), **or**
   - You explicitly ask for it to be closed.

## Closing a dev server that was started for testing

PowerShell (reliable on Windows — a plain `kill`/`kill -9` from Git Bash often fails to terminate a backgrounded `npm run dev`'s `node.exe`):

```powershell
try {
  Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction Stop |
    ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
} catch {}
```

Git Bash (works sometimes, not guaranteed):

```bash
lsof -ti:3000 -sTCP:LISTEN | xargs -r kill -9
```

If the Turbopack cache ends up corrupted after an unclean kill, wipe it before restarting:

```bash
rm -rf .next
```

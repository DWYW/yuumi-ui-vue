import { execSync } from "child_process";

try {
  const content = execSync(`git status | grep -E "\.vue|\.js|\.ts|\.jsx|\.tsx"`, { encoding: 'utf-8' })
  const files = (content.match(/(?<!((deleted:)|(删除：))\s+)(src|packages).*\.(vue|jsx?|tsx?)/g) || []).filter(file => /^(src|packages)/.test(file))
  execSync(`prettier --write ${files.join(" ")}`, { encoding: 'utf-8', stdio: 'inherit' })
} catch (error) {
  console.error(`Error executing command: ${error.message}`);
}
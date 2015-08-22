param($installPath, $toolsPath, $package, $project)

# Maintain a counter to calculate installation. See NuGet/Home#1032
$countFile = (Join-Path $toolsPath "count.txt")
if (-not [IO.File]::Exists($countFile))
{
  [IO.File]::WriteAllText($countFile, 1)

  # Extract node_modules to this package folder
  $exe = (Join-Path $toolsPath "7za.exe")
  $zip = (Join-Path $toolsPath "../node_modules.7z")
  & "$exe" x -t7z -y "$zip" -o"$toolsPath/.."
}
else
{
  $count = [IO.File]::ReadAllText($countFile)
  [IO.File]::WriteAllText($countFile, 1 + $count)
}

param($installPath, $toolsPath, $package, $project)

# Get installation counter to calculate if remove node_modules folder
$remove = $false
$countFile = (Join-Path $toolsPath "count.txt")
if (-not [IO.File]::Exists($countFile))
{
  $remove = $true
}
else
{
  $count = +[IO.File]::ReadAllText($countFile)
  if ($count -eq 1)
  {
    $remove = $true
    [IO.File]::Delete($countFile)
  }
  else
  {
    [IO.File]::WriteAllText($countFile, $count - 1)
  }
}

if ($remove)
{
  # Remove node_modules folder
  $nodeModulePath = (Join-Path $toolsPath "../node_modules")

  # Use CMD to avoid path too long issue. See http://stackoverflow.com/a/18267957/1436671
  & cmd /c rmdir /S /Q "$nodeModulePath"
}

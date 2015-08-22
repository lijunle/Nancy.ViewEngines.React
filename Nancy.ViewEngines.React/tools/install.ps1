param($installPath, $toolsPath, $package, $project)
$exe = (join-path $toolsPath "7za.exe")
$zip = (join-path $toolsPath "../node_modules.7z")
& "$exe" x -t7z -y "$zip" -o"$toolsPath/.."

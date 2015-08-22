# TODO it will break when several projects in a solution install this package
param($installPath, $toolsPath, $package, $project)
$nodeModulePath = (join-path $toolsPath "../node_modules")
& cmd /c rmdir /S /Q "$nodeModulePath" # Use CMD is to avoid path too long issue

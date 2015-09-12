$Project = "$($env:APPVEYOR_BUILD_FOLDER)\Nancy.ViewEngines.React.UnitTests"
$Stream = cmd /c "$($Project)\node_modules\.bin\mocha" --compilers js:babel/register -R json "$($Project)/*Tests/**/*.js"
$Output = [String]::Join("", $Stream)

$Result = ConvertFrom-Json $Output

$Failure = $false
foreach ($Test in $Result.Tests) {
    $Duration = $Test.Duration
    if ($Test.Err.Message) {
        Write-Host "Failed  $($Test.FullTitle) $($Test.Err.Message)"
        Add-AppveyorTest $Test.FullTitle -Outcome Failed -Duration $Duration -ErrorMessage $Test.Err.Message -ErrorStackTrace $Test.Err.Stack
        $Failure = $true
    }
    else {
        Write-Host "Passed  $($Test.FullTitle)"
        Add-AppveyorTest $Test.FullTitle -Outcome Passed -Duration $Duration
    }
}

if ($Failure -eq $true) {
    Write-Host "Failing build as there are broken tests"
    $host.SetShouldExit(1)
}

@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.
@REM Maven Wrapper startup batch script, version 3.2.0
@REM ----------------------------------------------------------------------------

@IF "%__MVNW_ARG0_NAME__%"=="" (SET __MVNW_ARG0_NAME__=%~nx0)
@SET ___MVNW_INEFFECTIVE_CMD=
@SET __MVNW_CMD=
@SET ERROR_CODE=0

@FOR /F "usebackq tokens=1* delims==" %%A IN (".mvn\wrapper\maven-wrapper.properties") DO (
    @IF "%%A"=="distributionUrl" SET DISTRIBUTION_URL=%%B
)

@SET MAVEN_USER_HOME=%USERPROFILE%\.m2\wrapper
@SET MAVEN_HOME=%MAVEN_USER_HOME%\dists\apache-maven-3.9.6

@IF EXIST "%MAVEN_HOME%\bin\mvn.cmd" GOTO runMvnCmd

@ECHO Downloading Apache Maven 3.9.6...
@MKDIR "%MAVEN_USER_HOME%\dists" 2>NUL
@SET DOWNLOAD_URL=https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.6/apache-maven-3.9.6-bin.zip
@SET ZIP_FILE=%MAVEN_USER_HOME%\apache-maven-3.9.6-bin.zip

@PowerShell -Command "& {Invoke-WebRequest -Uri '%DOWNLOAD_URL%' -OutFile '%ZIP_FILE%'}"
@PowerShell -Command "& {Expand-Archive -Path '%ZIP_FILE%' -DestinationPath '%MAVEN_USER_HOME%\dists' -Force}"
@REN "%MAVEN_USER_HOME%\dists\apache-maven-3.9.6" "apache-maven-3.9.6" 2>NUL
@DEL "%ZIP_FILE%"

:runMvnCmd
@SET EXEC="%MAVEN_HOME%\bin\mvn.cmd"
@%EXEC% %*
@SET ERROR_CODE=%ERRORLEVEL%
@EXIT /B %ERROR_CODE%

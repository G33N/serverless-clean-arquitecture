#!/usr/bin/env groovy
import groovy.json.JsonOutput

node {

	def scannerHome = tool 'scanner-3.0.3.778';
	def jobBaseName = "${env.JOB_NAME}".replace('/','-')

    properties([parameters([booleanParam(defaultValue: false, description: 'Deploy to AWS', name: 'deploy')])])

	// Mark the code checkout 'stage'....
	stage 'Checkout'
	checkout scm

	stage 'Prepare'
	sh '''npm install'''
	// sh '''npm ls -prod'''

	// stage 'Coding Standard'
	// sh '''npm run lint'''

	// stage 'Unit Test'
	// env.DB_NAME_DEV="wink"
	// env.DB_USER_DEV="wink"
	// env.DB_PASSWORD_DEV="VSkNBvMD7PAcz8NR"
	// env.DB_HOST_DEV="192.168.210.91"
	// env.DB_DIALECT_DEV="mysql"
	// // sh '''npm run test'''

	// stage 'Code Quality'
	// 	withSonarQubeEnv('sonarqube') {
	// 		sh "${scannerHome}/bin/sonar-scanner -Dsonar.host.url=${SONAR_HOST_URL} \
	// 		-Dsonar.login=${SONAR_AUTH_TOKEN} \
	// 		-Dsonar.projectName=${jobBaseName} \
	// 		-Dsonar.projectVersion=${BUILD_NUMBER} \
	// 		-Dsonar.projectKey=wink:${JOB_BASE_NAME} \
	// 		-Dsonar.sources=. \
	// 		-Dsonar.language=js \
	// 		-Dsonar.profile=node \
	// 		-Dsonar.scm.provider=git \
	// 		-Dsonar.exclusions=test/**,node_modules/** \
	// 		-Dsonar.dynamicAnalysis=reuseReports \
	// 		-Dsonar.javascript.jstest.reportsPath=coverage \
	// 		-Dsonar.javascript.lcov.reportPath=coverage/lcov-report"
	// 	}

	  
    if (env.BRANCH_NAME != 'test' && env.BRANCH_NAME != 'staging' && env.BRANCH_NAME != 'master' && env.deploy) {
      stage 'Deploy STG'
      sh '''serverless deploy --stage stg --no-color --verbose'''
    }

    if (env.BRANCH_NAME == 'test' && env.deploy) {
      stage 'Deploy TEST'
      sh '''serverless deploy --stage test --no-color'''
    }

    if (env.BRANCH_NAME == 'staging' && env.deploy) {
      stage 'Deploy PROD'
      sh '''serverless deploy --stage prod --aws-profile prod --no-color'''
    }

    if (env.BRANCH_NAME == 'master' && env.deploy) {
      stage 'Deploy PROD'
      sh '''serverless deploy --stage prod --aws-profile prod --no-color'''
    }

    stage 'Cleanup'
    sh '''npm prune'''
}

'use strict';
import * as vscode from 'vscode'

const fs = require('fs')
const homedir = require('os').homedir()
var path = require('path')

export function activate(context: vscode.ExtensionContext) {

	// vscode.workspace.onDidOpenTextDocument(() => {
	//     console.log("onDidOpenTextDocument");
	// });

	vscode.workspace.onDidSaveTextDocument((e) => {

		var milliseconds = (new Date).getTime()
		var transaction = {
			filename: e.fileName,
			timestamp: milliseconds
		}

		// Make history
		var filePath = path.join(homedir, '.vscode_history')
		fs.appendFile(filePath, JSON.stringify(transaction) + '\n', (err: any) => {
			if (err) { throw err }
			//console.log('The "data to append" was appended to file!');
		})
	})

	// vscode.workspace.onDidCloseTextDocument(() => {
	//     console.log("onDidCloseTextDocument");
	// });
}

export function deactivate() { }

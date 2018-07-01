'use strict';
// Imports
import {Disposable, ExtensionContext, workspace, TextDocument} from 'vscode';
const fs = require('fs');
const homedir = require('os').homedir();
var path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

  let controller = new WatcherController();
  context.subscriptions.push(controller);
  //context.subscriptions.push(workspace.onDidSaveTextDocument(e => updateEditHistory));
}

class WatcherController {

  private _disposable: Disposable;

  constructor() {

    // subscribe to selection change and editor activation events
    let subscriptions: Disposable[] = [];
    workspace.onDidSaveTextDocument(this._onEvent, this, subscriptions);
    //window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions);

    // create a combined disposable from both event subscriptions
    this._disposable = Disposable.from(...subscriptions);
  }

  dispose() {
    this._disposable.dispose();
  }

  private _onEvent(doc: TextDocument) {

    // Build object
    var milliseconds = (new Date).getTime();
    var transaction = {
      filename: doc.fileName,
      timestamp: milliseconds
    };
      
    // Append file to history
    fs.appendFile(path.join(homedir, 
      '.vscode_history'), 
      JSON.stringify(transaction) + "\n", 
      "utf8", 
      (err) => {
        if (err) throw err;
      }
    );
  }
}

// this method is called when your extension is deactivated
export function deactivate() {
}
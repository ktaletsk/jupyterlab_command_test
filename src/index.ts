import {JupyterFrontEnd, JupyterFrontEndPlugin} from '@jupyterlab/application';
import {ICommandPalette} from '@jupyterlab/apputils'
import {IMainMenu} from '@jupyterlab/mainmenu'

const extension: JupyterFrontEndPlugin<void> = {
  id: 'command_test',
  autoStart: true,
  requires: [ICommandPalette, IMainMenu],
  activate: (
    app: JupyterFrontEnd, 
    palette: ICommandPalette,
    mainMenu: IMainMenu) => {
    console.log('JupyterLab extension command_test is activated!');

    //Create new command
    const commandID = 'my-command';
    app.commands.addCommand(commandID, {
      label: 'My Cool Command',
      execute: () => {
        console.log(`Executed ${commandID}`);
      }
    });

    //Add command to the palette
    palette.addItem({
      command: commandID,
      category: 'notebook',
      args: {}
    });

    //Add command to context menu
    const selectorItem = '.jp-DirListing-item[data-isdir]';
    app.contextMenu.addItem({
      command: commandID,
      selector: selectorItem
    })

    //Add command to main menu
    mainMenu.fileMenu.addGroup([
      {
        command: commandID,
      }
    ], 40 /* rank */);

  }
};

export default extension;
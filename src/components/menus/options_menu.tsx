import { Backend } from "../../operations/backend";
import { switchToBeta, switchToNightly } from "../../operations/install";
import { PopupData } from "../../operations/popup_data";
import update from "../../operations/update";
import { Progress } from "nx-request-api";
import { FocusButton } from "../buttons/focus_button";
import { MenuType } from "../menu";
import { UpdateButton } from "../buttons/update_button";
import { AbstractMenu } from "./abstract_menu";

/**
 * builds the options menu components
 * @returns the options menu
 */
export default class OptionsMenu extends AbstractMenu<{setInfo: (info: string) => void, switchTo: (menu: MenuType) => void, version: string}> {
    public constructor(props: {setInfo: (info: string) => void, switchTo: (menu: MenuType) => void, version: string}) {
        super(props);
    }

    render(): JSX.Element {
        return <div className="main-menu">
                <FocusButton text={'\u21e0 Main Menu\u00A0'} 
                        className={"main-buttons"} 
                        onClick={() => this.props.switchTo(MenuType.MainMenu)}
                        onFocus={() => this.props.setInfo("Return to the Main menu")}/>
                {super.render()}
        </div>
    }
    
}

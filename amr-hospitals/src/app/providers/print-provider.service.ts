import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
declare var $: any;
@Injectable({ providedIn: 'root' })
export class PrintProviderService {

  print(selector: string, title: string = "Ber Tech", outer: boolean = true, css: boolean = true, style: boolean = true, delay: number = 500, tag: boolean = false, canvas: boolean = false) {
    let table = $(`#${selector}`);
    table.printThis({
      debug: false,               // show the iframe for debugging
      importCSS: css,            // import page CSS
      importStyle: style,         // import style tags
      printContainer: outer,       // grab outer container as well as the contents of the selector
      loadCSS: false,// [`${url}/assets/bootstrap.min.css`],  // path to additional css file - use an array [] for multiple
      pageTitle: title ?? environment.AppName,              // add title to print page
      removeInline: false,        // remove all inline styles from print elements
      printDelay: delay,            // variable print delay; depending on complexity a higher value may be necessary
      header: `<br /> <br /><h1 class="text-center text-tertiary">${title ? title : "bStudio"}</h1>`,               // prefix to html
      footer: `<footer>Bern Technologies</footer>`,               // postfix to html
      base: environment.AppUrl,            // preserve the BASE tag, or accept a string for the URL
      formValues: true,           // preserve input/form values
      canvas: canvas,              // copy canvas elements (experimental)
      //   doctypeString: "...",       // enter a different doctype for older markup
      removeScripts: false,       // remove script tags from print content
      copyTagClasses: tag         // copy classes from the html & body tag
    });
  }
}

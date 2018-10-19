import { Directive, HostListener, HostBinding } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
    selector: '[appMaskMoney]'
})
export class MaskMoneyDirective {
    valor: number;
    constructor(private model: NgModel) {}

    @HostListener('keyup') onInputChange() {
        this.model.valueChanges.subscribe(val => {
            let valor = val.replace(/\D/g, '')
            .replace(/((\d{2})$)/g, '.$2')
            .replace(/(^(0)+)/g, '');
            valor = `R$ ${valor.replace(/^(\D)/g, '0$1')}`;

            this.model.viewToModelUpdate(this.model.value);
            this.model.valueAccessor.writeValue(valor);


        });
    }
}

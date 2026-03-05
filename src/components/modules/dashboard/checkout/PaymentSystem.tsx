import { Field, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";

const PaymentSystem = () => {
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldLegend variant="label">Pay with cash below delivery.</FieldLegend>
      <RadioGroup defaultValue="Cash On Delivery">
        <Field orientation="horizontal">
          <RadioGroupItem value="Cash On Delivery" id="cash-on-delivery" checked />
          <FieldLabel htmlFor="cash-on-delivery" className="font-normal">
            Cash on Delivery
          </FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  );
};

export default PaymentSystem;

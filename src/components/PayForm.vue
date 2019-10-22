<template>
    <div class="payFormContainer">
        <form class="ui form" @submit.prevent="sendForm">
            <h4 class="ui dividing header">Order Information</h4>


            <div class="ui positive message" v-if="success">
                <div class="header">
                    Оплата успешно совершена.
                </div>
            </div>


            <div class="ui negative message" v-if="errors">
                <div class="header errorHeader">
                    Данные формы введены не корректно.
                </div>
                <p v-for="e in errors">{{e}}</p>
            </div>


            <div class="fields">
                <div class="field">
                    <input
                            type="text"
                            name="orderNumber"
                            v-model.numeric.tirm="payment.orderNumber"
                            value=""
                            placeholder="Order Number"
                            required
                            @keypress="onlyNumeric"
                    />
                </div>
                <div class="field">
                    <input
                            placeholder="0.00"
                            v-model.numeric.trim="payment.cost"
                            @keypress="onlyNumeric"
                            v-money="payment.cost !== null ? payment.cost : null"
                            required
                    />
                </div>
            </div>
            <div class="inline fields">
                <div class="field">
                    <div class="ui radio checkbox">
                        <input
                                id="currencyRUB"
                                class="hidden"
                                type="radio"
                                name="currency"
                                v-model="payment.currency"
                                value="1"
                                tabindex="0"
                        />
                        <label for="currencyRUB">RUB</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input
                                id="currencyUSD"
                                class="hidden"
                                type="radio"
                                name="currency"
                                v-model="payment.currency"
                                value="2"
                                tabindex="0"
                        />
                        <label for="currencyUSD">USD</label>
                    </div>
                </div>
            </div>
            <h4 class="ui dividing header">Billing Information</h4>
            <div class="fields">
                <div class="six wide field">
                    <label>Card Number</label>
                    <the-mask
                            type="text"
                            name="cardNumber"
                            v-model.trim="payment.cardNumber"
                            value=""
                            placeholder="#### #### #### ####"
                            required
                            :mask="'#### #### #### ####'"
                    />
                </div>
                <div class="five wide field">
                    <label>Card Holder</label>
                    <input
                            type="text"
                            name="cardHolder"
                            v-model.trim="payment.cardHolder"
                            placeholder="John Cena"
                    />
                </div>
                <div class="three wide field">
                    <label>Expiration</label>
                    <div class="two fields">
                        <div class="field">
                            <select
                                    class="ui fluid search dropdown"
                                    name="expireMonth"
                                    v-model="payment.expireMonth"
                                    required
                            >
                                <option value="">Month</option>
                                <option value="1">01</option>
                                <option value="2">02</option>
                                <option value="3">03</option>
                                <option value="4">04</option>
                                <option value="5">05</option>
                                <option value="6">06</option>
                                <option value="7">07</option>
                                <option value="8">08</option>
                                <option value="9">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </div>
                        <div class="two field">
                            <input
                                    type="text"
                                    name="expireYear"
                                    v-model.trim="payment.expireYear"
                                    placeholder="Year"
                                    maxlength="2"
                                    required
                                    @keypress="onlyNumeric"
                            />
                        </div>
                    </div>
                </div>
                <div class="two wide field">
                    <label>CVC</label>
                    <input
                            type="text"
                            name="cardCvv"
                            v-model.trim="payment.cardCvv"
                            placeholder="CVC"
                            maxlength="3"
                            required
                            @keypress="onlyNumeric"
                    />
                </div>
            </div>

            <button type="submit" class="ui button" tabindex="0" v-if="!editablePayment">Submit Payments</button>

            <input
                    v-if="editablePayment"
                    type="hidden"
                    name="id"
                    v-model.numeric.trim="payment.id"
            >
            <button v-if="editablePayment" type="submit" class="ui button" tabindex="0" >Confirm Edit</button>

        </form>
    </div>
</template>

<script>
    export default {
        name: "PayForm",
        props: {
          editablePayment : undefined
        },
        data: () => {
            return {
                payment: {
                    orderNumber : "",
                    cost: "",
                    currency: 1,
                    cardNumber : "",
                    cardHolder : "",
                    expireMonth : "",
                    expireYear : "",
                    cardCvv : "",
                },
                success : undefined,
                errors : undefined
            }
        },
        methods: {
            onlyNumeric(e) {
                let keyCode = (e.keyCode ? e.keyCode : e.which);
                if (keyCode < 48 || keyCode > 57) {
                    e.preventDefault();
                }
            },
            clear(){
                for(let key in this.payment) {
                    this.payment[key] = "";
                }
            },
            sendForm() {
                let dispatch;

                if (this.editablePayment) {
                    dispatch = "updatePayment";
                } else {
                    dispatch = "createPayment";
                }

                this.$store.dispatch(dispatch, this.payment)
                    .then(() => {
                        this.success = true;
                        this.errors = undefined;

                        if (this.editablePayment) {
                            this.$emit("updatePayment");
                        }

                        this.clear();

                        setTimeout(() => {
                            this.success = undefined;
                        }, 3500);

                    })
                    .catch((error) => {
                        if (error.error || typeof(error.error) != "string") {
                            this.errors = JSON.parse(error.error)
                        } else {
                            console.log(error.error);
                        }
                    });

                return false;
            }
        },
        mounted() {
            if (this.editablePayment) {
                this.payment = this.editablePayment;
            }
        }
    }
</script>

<style scoped>
    .payFormContainer{
        border: 1px solid rgba(34,36,38,.15);
        box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
        border-radius: .28571429rem;
        padding: 20px;
    }
</style>
<template>
    <div>
        <table class="ui celled table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Order Number</th>
                    <th>Cost</th>
                    <th>Currency</th>
                    <th>Card</th>
                    <th>Card Holder</th>
                    <th>Expire Month</th>
                    <th>Expire Year</th>
                    <th>Cvv</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="payment in allPayments" :key="payment.id">
                    <td>{{payment.id}}</td>
                    <td>{{payment.orderNumber}}</td>
                    <td>{{payment.cost}}</td>
                    <td>{{payment.currency | currency(payment.currency)}}</td>
                    <td>{{payment.cardNumber}}</td>
                    <td>{{payment.cardHolder}}</td>
                    <td>{{payment.expireMonth}}</td>
                    <td>{{payment.expireYear}}</td>
                    <td>{{payment.cardCvv}}</td>
                    <td class="action">
                        <i class="edit icon" @click="edit(payment.id)"></i>
                        <i class="delete icon" @click="remove(payment.id)"></i>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="ui dimmer modals page transition" :class="{'active' : editablePayment}">
            <div class="ui standard modal active transition">
                <i class="close icon" @click="editablePayment = undefined"></i>
                <div class="header">Edit Payment</div>
                <div class="content">
                    <pay-form v-if="editablePayment" :editablePayment="editablePayment" @updatePayment="editablePayment = undefined"></pay-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PayForm from "@/components/PayForm.vue";

    export default {
        name: "Payments.vue",
        components: {
            PayForm
        },
        data: () => {
            return {
                editablePayment : undefined
            }
        },
        filters: {
          currency : (index) => {
              let currency = ["", "RUB", "USD"];
              return currency[index];
          }
        },
        computed: {
            allPayments() {
                return this.$store.getters.allPayments;
            }
        },
        methods: {
            edit(id) {
                let index = this.allPayments.findIndex(item => item.id == id);
                this.editablePayment = Object.assign({},  this.allPayments[index]);
            },
            remove(id) {
                this.$store.dispatch("removePayment", id);
            }
        },
        mounted() {
            this.$store.dispatch("fetchPayments");
        }
    }
</script>

<style scoped>
    td.action i{
        cursor: pointer;
    }
</style>
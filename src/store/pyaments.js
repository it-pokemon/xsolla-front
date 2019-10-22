import http from "@/axios";

export default {
    actions: {
        async fetchPayments(ctx) {
            http.get('api/payments/')
                .then((response) => {
                    ctx.commit('fetchPayments', response.data);
                });
        },
        async createPayment(ctx, payment) {
            return new Promise((resolve, reject) => {
                http.post('api/payments/create', payment)
                    .then(function (response) {
                        ctx.commit('addPaymentInPaymentsList', response.data);
                        resolve();
                    })
                    .catch(function (error) {
                        console.log(error);
                        reject(error.response.data);
                    });
            })
        },
        async updatePayment(ctx, editablePayment) {
            return new Promise((resolve, reject) => {
                http.put('api/payments/update/' + editablePayment.id, editablePayment)
                    .then(function (response) {
                        ctx.commit('updatePayment', response.data);
                        resolve();
                    })
                    .catch(function (error) {
                        console.log(error);
                        reject(error.response.data);
                    });
            });
        },
        async removePayment(ctx, id) {
            http.delete("api/payments/delete/" + id)
                .then(response => {
                    ctx.commit('removePayment', id);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    mutations: {
        fetchPayments(state, payments) {
            state.payments = payments;
        },
        updatePayment(state, editablePayment) {
            let index = state.payments.findIndex(item => item.id == editablePayment.id);
            state.payments.splice(index, 1, editablePayment);
        },
        removePayment(state, id) {
            let index = state.payments.findIndex(item => item.id == id);
            state.payments.splice(index, 1);
        },
        addPaymentInPaymentsList(state, payment) {
            state.payments.push(payment);
        }
    },
    state: {
        payments : []
    },
    getters: {
        allPayments(state) {
            return state.payments;
        }
    }
}
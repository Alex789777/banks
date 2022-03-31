import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js'

Vue.component('loader', {
    template: `
        <div style="display: flex; justify-content: center; align-items: center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `
})

new Vue({
    el: '#app',
    data() {
        return {
            loading: false,
            hide_calc: 'display : none',
            hide_edit_bank: '',
            form: {
                name: '',
                rate: '',
                amount: '',
                min: '',
                term: '',
                initloan: '',
                initpay: '',
                monthpay: '',
            },
            banks: []
        }
    },
    computed: {
        canCreate() {
            return this.form.name.trim()
        },
        canCreate1() {
            return this.hide_calc
        }

    },
    methods: {
        fillForm(bank) {
            this.form.name = bank.name
            this.form.rate = bank.rate
            this.form.amount = bank.amount
            this.form.min = bank.min
            this.form.term = bank.term
            this.form._id = bank._id
            this.form.initloan = bank.initloan
            this.form.initpay = bank.initpay
            this.form.monthpay = bank.monthpay
        },
        clearForm() {
            this.form.name = this.form.rate = this.form.amount = this.form.min =
                this.form.term = this.form.initloan = this.form.initpay = this.form.monthpay = ''
            this.form._id = undefined
        },
        async createBank() {
            // console.log('вызов ф-ии createBank')
            const {...bank} = this.form
            const newBank = await request ('/api/banks', 'POST', bank)
            this.banks.push(newBank)
            this.clearForm()
        },
        async editBank(_id) {
            // console.log('вызов ф-ии editBank')
            const {...bank} = this.form
            const b = await request(`/api/banks`, 'PUT', bank)
            const idx = this.banks.findIndex(b => b._id === this.form._id)
            this.banks[idx] = b
            this.clearForm()
            if (!this.hide_calc) {
                this.hide_calc = 'display : none'
                this.hide_edit_bank = ''
            }
        },
        editBankClick(_id) {
            const bank = this.banks.find(b => b._id === _id)
            this.fillForm(bank)
            window.scrollTo(0, 0)
        },
        saveBankClick() {
            this.form._id ? this.editBank(this.form._id) : this.createBank()
        },
        async removeBank(_id) {
            const res = await request(`/api/banks/${_id}`, 'DELETE')
            this.banks = this.banks.filter(b => b._id !== _id)
        },
        calcClick(_id) {
            if (!this.hide_calc) {
                this.clearForm()
            } else {
                const bank = this.banks.find(b => b._id === _id)
                this.fillForm(bank)
            }
            this.hide_calc = this.hide_calc ? '' : 'display : none'
            this.hide_edit_bank = this.hide_edit_bank ? '' : 'display : none'
            window.scrollTo(0, 0)
        },
        change() {
            const bank = this.banks.find(b => b._id === this.form._id)
            const r12 = bank.rate / 12 / 100
            if (this.form.initloan && this.form.initpay &&
                this.form.initloan < bank.amount &&
                this.form.initpay > this.form.initloan*bank.min/100)
            {
                this.form.monthpay = (this.form.initloan * r12 * Math.pow((1+r12), bank.term)) / (Math.pow((1+r12), bank.term) - 1)
            } else {
                this.form.monthpay = 0
            }
        },
        cancel() {
                this.hide_calc = 'display : none'
                this.hide_edit_bank = ''
        }
    },
    mounted: async function () {
        this.loading = true
        this.banks = await request('/api/banks')
        this.loading = false
    }
})

async function request(url, method = 'GET', data = null) {
    try {
        const headers = {}
        let body

        if (data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        })
        return await response.json()
    } catch (e) {
        console.warn('Error', e.message)
    }
}
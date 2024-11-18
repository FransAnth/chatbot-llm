def max_earnings(earnings_per_fight):
    num_fights = len(earnings_per_fight)
    if num_fights == 0:
        return 0
    if num_fights == 1:
        return earnings_per_fight[0]

    total_earnings = []

    for i, earning in enumerate(earnings_per_fight):
        possible_fights = earnings_per_fight[i + 2 :]
        for fight in possible_fights:
            total_earnings.append(earning + fight)

    return max(total_earnings)


print(max_earnings([6]))
